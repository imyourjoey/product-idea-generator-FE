import { useRouter } from "vue-router";

export default function useNavigateTo() {
  const router = useRouter();

  function navigateTo(path) {
    router.push({ path });
  }

  return navigateTo;
}
