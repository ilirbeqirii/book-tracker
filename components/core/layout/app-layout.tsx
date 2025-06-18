import { Fragment } from "react";
import MainMenu from "./header/main-menu";
import ToastNotification, {
  useToastNotification,
} from "@book-tracker/components/ui/toast-notification/toast-notification";

function AppLayout({ children }: { children: React.ReactNode }) {
  const { isVisible, message, type } = useToastNotification();

  return (
    <Fragment>
      <MainMenu />
      <main>{children}</main>

      {isVisible && <ToastNotification message={message} type={type} />}
    </Fragment>
  );
}

export default AppLayout;
