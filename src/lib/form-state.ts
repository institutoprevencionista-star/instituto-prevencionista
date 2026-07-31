export type ActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  downloadUrl?: string;
  fieldErrors?: Record<string, string>;
};

export const initialActionState: ActionState = { status: "idle" };
