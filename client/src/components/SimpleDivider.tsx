export const SimpleDivider = ({ 
  variant = "default", 
  className = "" 
}: { 
  variant?: "default" | "inverted" | "dark";
  className?: string;
}) => {
  const getPath = () => {
    switch(variant) {
      case "inverted":
        return "M0,32 C320,64 640,0 960,32 L960,96 L0,96 Z";
      case "dark":
        return "M0,0 L960,0 L960,64 C640,96 320,32 0,64 Z";
      default:
        return "M0,32 C320,0 640,64 960,32 L960,0 L0,0 Z";
    }
  };

  const getColors = () => {
    switch(variant) {
      case "dark":
        return {
          fill: "rgb(15 23 42)", // slate-900
        };
      case "inverted":
        return {
          fill: "rgb(249 250 251)", // gray-50
        };
      default:
        return {
          fill: "white",
        };
    }
  };

  const { fill } = getColors();

  return (
    <div className={`w-full overflow-hidden leading-none ${className}`}>
      <svg
        viewBox="0 0 960 96"
        className="w-full h-16"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={getPath()}
          fill={fill}
        />
      </svg>
    </div>
  );
};