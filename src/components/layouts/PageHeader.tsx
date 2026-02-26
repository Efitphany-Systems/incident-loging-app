"use client";

const PageHeader = ({
  name,
  preAction,
  postAction,
}: {
  name: string;
  preAction?: React.ReactNode;
  postAction?: React.ReactNode;
}) => {
  return (
    <div className="mt-1 mb-4 flex items-center justify-between px-3">
      <div className="flex items-center justify-start">
        {preAction}
        <div className="text-accent-foreground inline-block text-xl font-bold md:text-3xl">{name}</div>
      </div>
      {postAction}
    </div>
  );
};

export default PageHeader;
