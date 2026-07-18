interface QuestionHeaderProps {
  number: string;
  question: string;
}

export default function QuestionHeader({ number, question }: QuestionHeaderProps) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="font-serif text-[18px] font-medium text-muted">
        {number}
      </span>
      <h2 className="font-serif text-[19px] font-medium italic leading-[1.4] text-ink md:text-[21px]">
        {question}
      </h2>
    </div>
  );
}
