import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { FlagHost } from "./components/Flags";
import { NotFound } from "./components/PageStates";
import { PlanPage } from "./pages/PlanPage";
import { MyPage } from "./pages/MyPage";
import { MemberPage, MembersPage } from "./pages/MembersPage";
import { PostPage } from "./pages/PostPage";
import { PostFormPage } from "./pages/PostFormPage";

export function App() {
	return (
		<AppLayout>
			<Routes>
				<Route path="/" element={<PlanPage />} />
				<Route path="/me" element={<MyPage />} />
				<Route path="/members" element={<MembersPage />} />
				<Route path="/members/:id" element={<MemberPage />} />
				<Route path="/posts/new" element={<PostFormPage mode="new" key="new" />} />
				<Route path="/posts/:id" element={<PostPage />} />
				<Route path="/posts/:id/edit" element={<PostFormPage mode="edit" key="edit" />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<FlagHost />
		</AppLayout>
	);
}
