import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { shortenUrl } from "@/api/urlApi";
import { useState } from "react";
import { Loader, Loader2 } from "lucide-react";
import axios from "axios";
import { useUserUrlStats } from "@/api/analyticsApi";

export function SectionCards() {
  const [longUrl, setLongUrl] = useState("");
  const [editCustomCode, setEditCustomCode] = useState("");
  const [editExpirationDate, setEditExpirationDate] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { data: stats } = useUserUrlStats();

  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleShortenQuick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!longUrl.trim()) {
      setError("Please enter a valid URL.");
      return;
    }

    setLoading(true);
    try {
      const result = await shortenUrl({
        originalUrl: longUrl,
      });
      setShortUrl(result.shortUrl);
      toast.success("Link shortened!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
      } else if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleShortenCustom = async () => {
    setError("");
    if (!longUrl.trim()) {
      setError("Please enter a valid URL.");
      return;
    }

    const today = new Date();
    const selectedDate = new Date(editExpirationDate);
    if (selectedDate < new Date(today.toDateString())) {
      toast.error("Expiration date cannot be in the past");
      return;
    }

    setLoading(true);
    try {
      const result = await shortenUrl({
        originalUrl: longUrl,
        customCode: editCustomCode,
        expirationDate: editExpirationDate,
      });
      setShortUrl(result.shortUrl);
      toast.success("Custom link created!");
      closeDialog();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
      } else if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (shortUrl) {
      try {
        await navigator.clipboard.writeText(shortUrl);
        toast("Copied to clipboard!");
      } catch {
        toast("Failed to copy.");
      }
    }
  };

  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <Card className="@container/card @xl/main:col-span-2">
        <CardHeader className="relative font-semibold tabular-nums">
          <CardDescription>Create Custom Url or Quick Shorten</CardDescription>
        </CardHeader>
        <CardContent className="@[250px]/card:text-3xl text-2xl">
          <form
            onSubmit={handleShortenQuick}
            className="flex flex-col md:flex-row gap-5"
          >
            <div className="md:w-1/2">
              <Input
                className="w-full text-[16px]"
                type="url"
                placeholder="Enter your loooooong link"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                aria-invalid={!!error}
              />
              {error && (
                <p className="text-red-600 dark:text-red-400 text-sm max-w-[350px]">
                  {error}
                </p>
              )}
              <div className="flex justify-between items-center mt-2 w-full">
                <Button
                  className="cursor-pointer w-full max-w-1/2 text-white bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 rounded-r-none"
                  onClick={openDialog}
                  type="button"
                >
                  Custom Link
                </Button>
                <Button
                  className="cursor-pointer w-full max-w-1/2 text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-l-none"
                  type="submit"
                >
                  {loading && <Loader2 className="animate-spin h-5 w-5" />}
                  {loading ? "Shortening..." : "Quick Shorten"}
                </Button>
              </div>
            </div>

            <div className="md:w-1/2">
              <Input
                value={shortUrl || ""}
                readOnly
                placeholder="You short link appears here"
                className="w-full text-[16px]"
              />
              <Button
                className="cursor-pointer w-full text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                onClick={handleCopy}
                type="button"
                disabled={!shortUrl}
              >
                Copy
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Custom Link</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Original URL</label>
              <Input
                className="dark:bg-gray-700 dark:border-gray-600"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Custom Code</label>
              <Input
                className="dark:bg-gray-700 dark:border-gray-600"
                value={editCustomCode}
                onChange={(e) => setEditCustomCode(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Expiration Date
              </label>
              <Input
                className="dark:bg-gray-700 dark:border-gray-600"
                type="date"
                value={editExpirationDate}
                onChange={(e) => setEditExpirationDate(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleShortenCustom} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Creating...
                </>
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Clicks</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {stats ? (
              stats.totalClicks
            ) : (
              <Loader className="animate-spin h-5 w-5 text-gray-500" />
            )}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="text-muted-foreground">Total number of clicks</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Links</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {stats ? (
              stats.totalLinks
            ) : (
              <Loader className="animate-spin h-5 w-5 text-gray-500" />
            )}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="text-muted-foreground">
            Total number of links created
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
