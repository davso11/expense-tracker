import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UpdateCategoryForm } from './forms/update-category';
import { ExpenseCategory } from '@/types';
import { cn } from '@/lib/utils';

export function CategoryCard({
  category,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  category: ExpenseCategory;
}) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog
      open={openDialog}
      onOpenChange={setOpenDialog}
    >
      <DialogTrigger>
        <div
          className={cn(className)}
          {...props}
        >
          <div className="center-flex flex-col">
            <div className="center-flex size-16 rounded-full bg-slate-100">
              <span className="text-3xl">{category.emoji}</span>
            </div>
            <span className="mt-1 line-clamp-1 max-w-16 text-center text-xs capitalize text-muted-foreground">
              {category.name}
            </span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[25.25rem]">
        <DialogHeader>
          <DialogTitle>Catégorie de dépense</DialogTitle>
        </DialogHeader>

        {/* FORM */}
        <UpdateCategoryForm
          category={category}
          setOpenDialog={setOpenDialog}
        />
      </DialogContent>
    </Dialog>
  );
}
