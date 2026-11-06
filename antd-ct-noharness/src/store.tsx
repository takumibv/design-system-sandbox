import { createContext, useContext } from "react";
import type { Member, Scenario, Week } from "./data";

export type Store = {
  scenario: Scenario;
  loggedIn: boolean;
  me?: Member;
  members: Member[];
  weeks: Week[];
  loading: boolean;
  loadError: boolean;
  path: string;
  navigate: (path: string) => void;
  login: () => void;
  logout: () => void;
  reload: () => void;
  removeMember: (id: number) => void;
  updateMe: (patch: Partial<Member>) => void;
  person: (id: number) => Member | undefined;
};

export const StoreContext = createContext<Store | null>(null);

export function useStore(): Store {
  const v = useContext(StoreContext);
  if (!v) throw new Error("StoreContext missing");
  return v;
}

/** 社員番号（デモでは id）順の参加者 */
export const activeMembers = (members: Member[]) => members.filter((m) => m.active).sort((a, b) => a.id - b.id);
