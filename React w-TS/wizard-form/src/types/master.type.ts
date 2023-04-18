import { UserType } from "./user.type";

export type MasterType = {
  userDetails: UserType;
  setUserDetails: Function;
  formData: any;
  setFormData: Function;
  cancel: string;
  setCancel: Function;
  finalButton: string;
  setFinalButton: Function;
  edit: boolean;
  setEditButton: Function;
};
