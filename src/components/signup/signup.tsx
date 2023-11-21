import '../index.css';
import HelloFriendSide from '../hello-friend-side';
import SignupInputSide from './signup-input-side';

function Signup() {
  return (
    <div className="flex">
      <SignupInputSide />
      <HelloFriendSide buttonText="sign in" navigateTo="/login" />
    </div>
  );
}
export default Signup;
