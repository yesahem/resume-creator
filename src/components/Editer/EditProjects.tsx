"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Import Textarea

const EditProjects = ({projectItems, setProjectItems}) => {

  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false);
  const [isEditProjectDialogOpen, setIsEditProjectDialogOpen] = useState(false);
  const [isDeleteProjectDialogOpen, setIsDeleteProjectDialogOpen] = useState(false);
  const [selectedProjectItem, setSelectedProjectItem] = useState(null);
  const [formState, setFormState] = useState({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    details: "",
    technologies: "",
  });

  const handleAddProject = () => {
    setFormState({
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      details: "",
      technologies: "",
    });
    setIsAddProjectDialogOpen(true);
  };

  const handleEditProject = (item) => {
    setSelectedProjectItem(item);
    setFormState({
      title: item.title,
      company: item.company,
      startDate: item.startDate,
      endDate: item.endDate,
      details: item.details.join("\n") || "", // Convert array to string with new lines
      technologies: item.technologies.join(", ") || "", // Convert array to comma-separated string
    });
    setIsEditProjectDialogOpen(true);
  };

  const handleDeleteProject = (item) => {
    setSelectedProjectItem(item);
    setIsDeleteProjectDialogOpen(true);
  };

  const handleSaveProject = () => {
    const newItem = {
      id: selectedProjectItem ? selectedProjectItem.id : Date.now(),
      title: formState.title,
      company: formState.company,
      startDate: formState.startDate,
      endDate: formState.endDate,
      details: formState.details.split("\n").filter((detail) => detail.trim() !== ""), // Split by new lines and filter empty strings
      technologies: formState.technologies.split(",").map((tech) => tech.trim()).filter((tech) => tech), // Convert comma-separated string to array
    };

    if (selectedProjectItem) {
      setProjectItems(
        projectItems.map((item) => (item.id === selectedProjectItem.id ? newItem : item))
      );
    } else {
      setProjectItems([...projectItems, newItem]);
    }

    setIsAddProjectDialogOpen(false);
    setIsEditProjectDialogOpen(false);
    setSelectedProjectItem(null);
  };

  const handleDeleteConfirm = () => {
    setProjectItems(
      projectItems.filter((item) => item.id !== selectedProjectItem.id)
    );
    setIsDeleteProjectDialogOpen(false);
    setSelectedProjectItem(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex h-auto w-full flex-col md:flex-row">
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center py-2">
          <h2 className="mb-4 text-2xl font-bold">Projects</h2>
          <Button onClick={handleAddProject} className="mb-4">
            Add Project
          </Button>
        </div>
        <div className="space-y-4">
          {projectItems.map((item) => (
            <Card key={item.id} className="flex items-center justify-between p-2">
              <div>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-muted-foreground">{item.company}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditProject(item)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteProject(item)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Project Dialog */}
      <Dialog
        open={isAddProjectDialogOpen}
        onOpenChange={setIsAddProjectDialogOpen}
      >
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formState.title}
                placeholder="Enter project title"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={formState.company}
                placeholder="Enter company name"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="text"
                value={formState.startDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="text"
                value={formState.endDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="details">Details</Label>
              <Textarea
                id="details"
                name="details"
                value={formState.details}
                placeholder="Enter details separated by new lines"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="technologies">Technologies</Label>
              <Input
                id="technologies"
                name="technologies"
                value={formState.technologies}
                placeholder="Enter technologies separated by commas"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddProjectDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveProject}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog
        open={isEditProjectDialogOpen}
        onOpenChange={setIsEditProjectDialogOpen}
      >
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formState.title}
                placeholder="Enter project title"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={formState.company}
                placeholder="Enter company name"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="text"
                value={formState.startDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="text"
                value={formState.endDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="details">Details</Label>
              <Textarea
                id="details"
                name="details"
                value={formState.details}
                placeholder="Enter details separated by new lines"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="technologies">Technologies</Label>
              <Input
                id="technologies"
                name="technologies"
                value={formState.technologies}
                placeholder="Enter technologies separated by commas"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditProjectDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveProject}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Project Confirmation Dialog */}
      <Dialog
        open={isDeleteProjectDialogOpen}
        onOpenChange={setIsDeleteProjectDialogOpen}
      >
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this project?</p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteProjectDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} variant="destructive">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProjects;
