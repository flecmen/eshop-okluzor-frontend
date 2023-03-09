import { useQuasar } from 'quasar';

export default function useNotify() {
  const $q = useQuasar();
  const success = (message: string) => {
    $q.notify({
      type: 'positive',
      message: message
    })
  }

  const fail = (message: string) => {
    $q.notify({
      type: 'negative',
      message: message
    })
  }

  const warning = (message: string) => {
    $q.notify({
      type: 'warning',
      message: message
    })
  }

  const info = (message: string) => {
    $q.notify({
      type: 'info',
      message: message
    })
  }

  return {
    success,
    fail,
    warning,
    info,
  }
}
