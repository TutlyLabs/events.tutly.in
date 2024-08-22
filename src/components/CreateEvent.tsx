"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function CreateEventDialog() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    type: "CONTEST",
    tags: "",
    startTime : "",
  });

  function generateUniqueSlug(name: string) {
    let slug = name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    let newSlug = slug;
    let counter = 1;
    while (counter !== 5) {
      newSlug = `${name}:${slug}-${counter}`;
      counter++;
    }
    return newSlug;
  }

  const handleCreateEvent = async () => {
    const { name, type,tags,startTime } = form;

    console.log(name, type, tags, startTime);
    
    const slug = generateUniqueSlug(name);

    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, type, slug }),
    });

    console.log(res);
    
    if (res.ok) {
      router.push(`/event/${slug}`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-gray-300">
          Create Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>
            Enter the basic details to create a new event.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <select
              id="type"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="col-span-3 p-2 border rounded"
            >
              <option value="CONTEST">Contest</option>
              <option value="HACKATHON">Hackathon</option>
              <option value="WORKSHOP">Workshop</option>
              <option value="WEBINAR">Webinar</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Tags
            </Label>
            <Input
              id="tags"
              placeholder="Enter tags separated by commas"
              className="col-span-3 p-2 border rounded"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Date
            </Label>
            <Input
              type="datetime-local"
              placeholder="Enter tags separated by commas"
              className="col-span-3 p-2 border rounded"
              value={form.startTime}
              onChange={(e) => setForm({ ...form, startTime: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleCreateEvent}>
            Create Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
