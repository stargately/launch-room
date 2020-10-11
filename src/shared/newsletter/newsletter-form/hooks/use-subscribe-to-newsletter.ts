import { useMutation } from "@apollo/client";
import { subscribeToNewsletter } from "@/shared/newsletter/newsletter-form/data/mutations";
import { SubscribeToNewsletter } from "@/shared/newsletter/newsletter-form/data/__generated__/SubscribeToNewsletter";

export function useSubscribeToNewsletter() {
  const [mutate, { data, loading }] = useMutation<SubscribeToNewsletter>(
    subscribeToNewsletter
  );
  return {
    subscribeToNewsletter: mutate,
    added: Boolean(data),
    loading,
  };
}
