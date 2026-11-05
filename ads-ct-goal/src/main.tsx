import { cssMap } from "@atlaskit/css";
import { Box } from "@atlaskit/primitives/compiled";
import { token } from "@atlaskit/tokens";
import { createRoot } from "react-dom/client";
const styles = cssMap({ root: { padding: token("space.200"), maxWidth: "960px" } });
createRoot(document.getElementById("root")!).render(<Box xcss={styles.root}>hello</Box>);
