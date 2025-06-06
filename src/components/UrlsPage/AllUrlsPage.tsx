import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import SingleUrlCard from "./SingleUrlCard";
import CardSkeleton from "./CardSkeleton";
import { deleteUrl, fetchUrls, updateUrl } from "@/api/urlApi";

export interface ShortUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: string;
  updatedAt: string;
  expirationDate: string;
}

export default function AllUrlsPage() {
  const [urls, setUrls] = useState<ShortUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ShortUrl | null>(null);
  const [editOriginalUrl, setEditOriginalUrl] = useState("");
  const [editCustomCode, setEditCustomCode] = useState("");
  const [editExpirationDate, setEditExpirationDate] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [deleting, setDeleting] = useState<ShortUrl | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const urls = await fetchUrls();
        setUrls(urls);
      } catch (error) {
        console.error("Failed to fetch URLs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshTrigger]);

  useEffect(() => {
    if (editing) {
      setEditOriginalUrl(editing.originalUrl || "");
      setEditCustomCode(editing.shortCode || "");
      setEditExpirationDate(editing.expirationDate?.slice(0, 10) || "");
    }
  }, [editing]);

  const handleUpdate = async () => {
    if (!editing) return;

    const today = new Date();
    const selectedDate = new Date(editExpirationDate);

    if (selectedDate < new Date(today.toDateString())) {
      toast.error("Expiration date cannot be in the past");
      return;
    }

    try {
      await updateUrl(editing.shortCode, {
        originalUrl: editOriginalUrl,
        customCode: editCustomCode,
        expirationDate: editExpirationDate,
      });

      setEditing(null);
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to update URL", error);
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;

    try {
      await deleteUrl(deleting.shortCode);
      setDeleting(null);
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <CardSkeleton />;
  }

  return (
    <div className="w-full flex justify-center">
      <div className="space-y-4 w-full max-w-[900px]">
        {urls.map((url) => (
          <SingleUrlCard
            key={url.id}
            url={url}
            onEdit={() => {
              setEditing(url);
              setEditOriginalUrl(url.originalUrl);
            }}
            onDelete={() => setDeleting(url)}
          />
        ))}
      </div>

      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Original URL</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Original URL</label>
              <Input
                value={editOriginalUrl}
                onChange={(e) => setEditOriginalUrl(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Custom Code</label>
              <Input
                value={editCustomCode}
                onChange={(e) => setEditCustomCode(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Expiration Date
              </label>
              <Input
                type="date"
                value={editExpirationDate}
                onChange={(e) => setEditExpirationDate(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleUpdate}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleting} onOpenChange={() => setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this URL?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
