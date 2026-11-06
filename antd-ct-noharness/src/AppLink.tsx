import { Typography } from "antd";
import { useStore } from "./store";

/** 画面内の移動。本物の <a href> を出しつつ、クリックはページ遷移なしで切り替える */
export function AppLink({ to, children }: { to: string; children: React.ReactNode }) {
  const { navigate } = useStore();
  return (
    <Typography.Link
      href={to}
      // 文中に置くこともあるので、色だけでなく下線でもリンクとわかるようにする（axe: link-in-text-block）
      underline
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </Typography.Link>
  );
}
