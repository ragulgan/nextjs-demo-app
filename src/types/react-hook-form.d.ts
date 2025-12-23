declare module "react-hook-form" {
  export type SubmitHandler<TFieldValues = any> = (data: TFieldValues, event?: any) => any;

  export function useForm<TFieldValues = any>(): {
    register: any;
    handleSubmit: (handler: SubmitHandler<TFieldValues>) => (event?: any) => any;
    formState: { errors: Record<string, { message?: string }> };
  };
}


