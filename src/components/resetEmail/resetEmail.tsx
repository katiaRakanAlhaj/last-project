import HelloFriendSide from '../hello-friend-side';
import ResetEmailInputSide from './resetEmail-input-side';

function ResetEmail() {
  return (
    <div className="flex">
      <ResetEmailInputSide />
      <HelloFriendSide buttonText="sign in" navigateTo="/login" />
    </div>
  );
}

export default ResetEmail;
