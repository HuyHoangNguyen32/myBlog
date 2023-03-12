import styled from 'styled-components';

export function Footer() {
  return (
    <footer id="main-footer" className="bg-dark fixed-bottom p-2 mt-5">
      <div className="container">
        <div className="row">
          <SFooter>
            <div style={{ display: 'flex' }}>
              <STextFooter>Made with</STextFooter>
              <SHeart class="heart" viewBox="0 0 32 29.6">
                <path
                  d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
                />
              </SHeart>
              <STextFooter>by Hoang</STextFooter>
            </div>

            <div>
              <STextFooter>
                &copy;
                <span>{new Date().getFullYear()}</span> My Blog
              </STextFooter>
            </div>
          </SFooter>
        </div>
      </div>
    </footer>
  );
}

const SFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin-bottom: 0;
  }
`;

const STextFooter = styled.p`
  color: #fff;
`;

const SHeart = styled.svg`
  fill: red;
  position: relative;
  top: 5px;
  width: 10px;
  animation: pulse 1s ease infinite;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.3);
    }
    100% {
      transform: scale(1);
    }
  }
`;
