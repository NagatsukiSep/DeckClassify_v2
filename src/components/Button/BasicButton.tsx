export const BasicButton = (props: { onClick: () => void, children: React.ReactNode, disabled?: boolean }) => {
  return (
    <button 
      className="text-white font-m-plus-1p bg-[#4840A0] border-[#202860] border-2 hover:bg-[#363077] focus:ring-2 focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-1 me-2 m-2 " 
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}