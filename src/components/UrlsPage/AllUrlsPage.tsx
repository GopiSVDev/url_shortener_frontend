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
import { fetchUrls } from "@/api/urlApi";

export interface ShortUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: string;
  updatedAt: string;
}

export default function AllUrlsPage() {
  const [urls, setUrls] = useState<ShortUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ShortUrl | null>(null);
  const [deleting, setDeleting] = useState<ShortUrl | null>(null);
  const [editInput, setEditInput] = useState("");

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
  }, []);

  const handleUpdate = () => {
    if (!editing) return;
    setUrls((prev) =>
      prev.map((url) =>
        url.id === editing.id ? { ...url, originalUrl: editInput } : url
      )
    );
    setEditing(null);
    toast("URL updated");
  };

  const handleDelete = () => {
    if (!deleting) return;
    setUrls((prev) => prev.filter((url) => url.id !== deleting.id));
    setDeleting(null);
    toast("URL deleted");
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
              setEditInput(url.originalUrl);
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
          <Input
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
          />
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
