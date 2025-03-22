
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Tag, Search } from 'lucide-react';
import { AgencyCategory } from '@/types';

// Mock categories to start with
const initialCategories: AgencyCategory[] = [
  'Residential',
  'Commercial',
  'Industrial',
  'Land',
  'Property Management',
  'Luxury',
  'Investment',
  'International'
];

const ManageCategories = () => {
  const [categories, setCategories] = useState<AgencyCategory[]>(initialCategories);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryToEdit, setCategoryToEdit] = useState<{ index: number; name: string } | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  const filteredCategories = categories.filter(category => 
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add new category
  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast.error('Category name cannot be empty');
      return;
    }

    if (categories.includes(newCategoryName as AgencyCategory)) {
      toast.error('Category already exists');
      return;
    }

    setCategories([...categories, newCategoryName as AgencyCategory]);
    setNewCategoryName('');
    toast.success('Category added successfully');
  };

  // Edit category
  const handleEditCategory = () => {
    if (!categoryToEdit) return;
    
    if (!categoryToEdit.name.trim()) {
      toast.error('Category name cannot be empty');
      return;
    }

    if (categories.includes(categoryToEdit.name as AgencyCategory) && 
        categories[categoryToEdit.index] !== categoryToEdit.name) {
      toast.error('Category already exists');
      return;
    }

    const updatedCategories = [...categories];
    updatedCategories[categoryToEdit.index] = categoryToEdit.name as AgencyCategory;
    setCategories(updatedCategories);
    setCategoryToEdit(null);
    toast.success('Category updated successfully');
  };

  // Delete category
  const handleDeleteCategory = () => {
    if (categoryToDelete === null) return;
    
    const updatedCategories = categories.filter((_, index) => index !== categoryToDelete);
    setCategories(updatedCategories);
    setCategoryToDelete(null);
    toast.success('Category deleted successfully');
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Manage Categories</h1>
            <p className="text-muted-foreground">
              Add, edit, and delete property categories
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0">
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>
                  Create a new category for agencies to use
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="new-category">Category Name</Label>
                  <Input
                    id="new-category"
                    placeholder="e.g., Beachfront Properties"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleAddCategory}
                  disabled={!newCategoryName.trim()}
                >
                  Add Category
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Property Categories
            </CardTitle>
            <CardDescription>
              Manage the categories available for agencies
            </CardDescription>
            
            <div className="mt-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category Name</TableHead>
                  <TableHead className="w-[140px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center py-8 text-muted-foreground">
                      {searchTerm ? 'No categories found matching your search' : 'No categories found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCategories.map((category, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{category}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => setCategoryToEdit({ index, name: category })}>
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Category</DialogTitle>
                              <DialogDescription>
                                Update the category name
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-category">Category Name</Label>
                                <Input
                                  id="edit-category"
                                  value={categoryToEdit?.name || ''}
                                  onChange={(e) => setCategoryToEdit(prev => prev ? { ...prev, name: e.target.value } : null)}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={handleEditCategory}>
                                Save Changes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => setCategoryToDelete(index)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will delete the "{category}" category. This action cannot be undone.
                                Agencies that have been assigned this category will need to update their listings.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleDeleteCategory} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t pt-6 flex justify-between text-sm text-muted-foreground">
            <div>Total Categories: {categories.length}</div>
            <div>Filtered Results: {filteredCategories.length}</div>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ManageCategories;
