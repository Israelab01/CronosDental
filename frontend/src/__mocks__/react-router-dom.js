export const useNavigate = () => jest.fn();
export const Link = ({ children }) => <div>{children}</div>;
export const Navigate = ({ to }) => <div>Redirect to {to}</div>;
