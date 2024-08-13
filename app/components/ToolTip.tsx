interface IProps {
  title: string;
  children: React.ReactNode;
}

export default function ToolTip({ title, children }: IProps) {
  return (
    <div className="group relative flex justify-center text-nowrap">
      {children}
      <span className="absolute top-10 scale-0 rounded bg-[#424142] p-2 text-xs text-white group-hover:scale-100">
        {title}
      </span>
    </div>
  );
}
