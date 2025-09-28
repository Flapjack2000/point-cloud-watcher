import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip"
import { SwitchCamera } from "lucide-react";
import { Shapes } from "lucide-react";


type ViewportButtonProps = {
  icon: React.ComponentType<{ color?: string; size?: number }>;
  text: string;
  action: () => void;
  condition?: boolean;
};

function ViewportButton(props: ViewportButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        onClick={props.action}
        className=" cursor-pointer opacity-20 hover:opacity-100 transition-opacity duration-50 flex items-center justify-center rounded-md p-2">

        <props.icon color="black" size={24} />
      </TooltipTrigger>

      <TooltipContent style={{ userSelect: "none" }}>
        {props.text}
      </TooltipContent>
    </Tooltip>
  );
}

type ViewportOverlayProps = {
  resetCamera: () => void;
};

function ViewportOverlay(props: ViewportOverlayProps) {
  return (
    <div
      className="
        bg-transparent hover:bg-[rgba(255,255,255,0.3)] transition-all duration-150 top-0 left-1/2 grid grid-cols-7 rounded-md"
      style={{
        zIndex: 1,
        position: "fixed",
        transform: "translateX(-50%)"
      }}>

      <ViewportButton
        icon={SwitchCamera}
        text={"Reset Camera Position"}
        action={props.resetCamera}
        condition={true} />
    </div >
  )
}

export default ViewportOverlay