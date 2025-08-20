export interface ContactPayload {
  id: string;
  name: string;
  responsible_user_id: string;
  group_id: string;
  date_create: string;
  last_modified: string;
  created_user_id: string;
  modified_user_id: string;
  account_id: string;
  created_at: string;
  updated_at: string;
  custom_fields?: any[];
}