interface TabContentPostCommentProps {
  active: string;
}

const TabContentPostComment = ({ active }: TabContentPostCommentProps) => {
  if (!active) return null;

  switch (active) {
    case "all":
      return <div>all</div>;
    case "foto":
      return <div>foto</div>;
    case "video":
      return <div>video</div>;
    default:
      return <div>Tab tidak tersedia</div>;
  }
};

export default TabContentPostComment;
