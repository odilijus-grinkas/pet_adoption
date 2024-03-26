interface ErrorMessage {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

const ErrorMessage = ({ message }: { message: string }) => {
    return (
      <div className='errorMessage'>{message}</div>
    );
  };
  
  export default ErrorMessage;