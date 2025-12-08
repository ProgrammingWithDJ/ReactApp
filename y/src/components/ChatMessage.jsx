import RobotProfileImage from '../assets/AI.jpg'
import UserProfileImage from '../assets/BlankUser.jpg'
     
     export function ChatMessage({ message, sender }) {
        return (
          <div className={`message ${sender}`}>
            {sender === "robot" && (
              <img src={RobotProfileImage} width="50" alt="AI avatar" />
            )}
            <span>{message}</span>
            {sender === "user" && (
              <img src={UserProfileImage} width="50" alt="User avatar" />
            )}
          </div>
        );
      }