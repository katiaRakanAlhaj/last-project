import HelloFriendSide from '../hello-friend-side';
import ResetPasswordInputSide from './resetPasswors-input-side';

function ResetPassword() {
  return (
    <div className="flex">
      <ResetPasswordInputSide />
      <HelloFriendSide buttonText="sign in" navigateTo="/login" />
    </div>
  );
}

export default ResetPassword;
