'use client';

import { useState } from 'react';
import { addTask } from '../actions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function NewTaskModal() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setMessage('');

    try {
      await addTask(formData);
      setMessage('Task created successfully! 🎉');
      const handleSubmit = async (formData: FormData) => {
  setIsSubmitting(true);
  setMessage('');

  try {
    await addTask(formData);
    setMessage('Task created successfully! 🎉');
    
    // Refresh the page with current filter preserved
    setTimeout(() => {
      window.location.reload();   // Simple way to refresh with current URL
      // setOpen(false);          // We can remove this if we want to keep modal open
    }, 1200);
  } catch (error) {
    setMessage('Failed to create task. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
    } catch (error) {
      setMessage('Failed to create task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          + New Task
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-700 text-white">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Add a new task to your list.
          </DialogDescription>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="What needs to be done?"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Add more details (optional)"
              rows={3}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select name="priority" defaultValue="medium" disabled={isSubmitting}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {message && (
            <p className={`text-sm ${message.includes('success') ? 'text-emerald-400' : 'text-red-400'}`}>
              {message}
            </p>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? 'Creating...' : 'Create Task'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}