import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = () => {
  toast('Default Notification !');

  toast.success('Success Notification !', {
    position: toast.POSITION.TOP_CENTER,
  });

  toast.error('Error Notification !', {
    position: toast.POSITION.TOP_LEFT,
  });

  toast.warn('Warning Notification !', {
    position: toast.POSITION.BOTTOM_LEFT,
  });

  toast.info('Info Notification !', {
    position: toast.POSITION.BOTTOM_CENTER,
  });

  toast('Custom Style Notification with css class!', {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: 'foo-bar',
  });
};

type ToastMessageType = 'default' | 'error' | 'warn' | 'info' | 'success';
type ToastMessagePosition =
  | 'top_right'
  | 'top_center'
  | 'top_left'
  | 'bottom_right'
  | 'bottom_center'
  | 'bottom_left';

interface ToastMessageContainerProps {
  message: string;
  duration?: number;
  type?: ToastMessageType;
  position?: ToastMessagePosition;
}

const toastMessageContainer = ({
  message,
  type = 'default',
  position = 'top_right',
  duration = 3000,
}: ToastMessageContainerProps): void => {
  if (type !== 'default') {
    toast[type](message, {
      position: toast.POSITION[position.toUpperCase()],
      autoClose: duration,
    });
  } else {
    toast(message, {
      position: toast.POSITION[position.toUpperCase()],
      autoClose: duration,
    });
  }
};

const toastSuccessMessage = (message: string, duration?: number): void => {
  toastMessageContainer({ message, type: 'success', duration });
};

export { toastSuccessMessage };
