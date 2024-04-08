import { createContext, useContext, useState } from 'react';

type TNewCategoryDialogCtx = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ctx = createContext<TNewCategoryDialogCtx>({} as TNewCategoryDialogCtx);

const useNewCategoryDialog = () => {
  if (!ctx) throw new Error('NewCategoryDialogProvider not found');
  return useContext(ctx);
};

const NewCategoryDialogProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [open, setOpen] = useState(false);

  return <ctx.Provider value={{ open, setOpen }}>{children}</ctx.Provider>;
};

export { NewCategoryDialogProvider, useNewCategoryDialog };
// 8, 13, 15, 20, 22
