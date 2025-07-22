export default interface Result<TData> {
  success: boolean;
  message: string | null;
  errors: string[];
  data: TData;
}
