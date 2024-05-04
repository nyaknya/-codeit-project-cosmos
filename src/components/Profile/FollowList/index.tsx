import styles from './FollowList.module.scss';
import classNames from 'classnames/bind';
import Modal from '@/components/Common/Layout/Modal';
import Follow from './Follow';
import { ModalPropsType } from '@/@types/type';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FollowData, getFollowingData } from '@/api/Follow';

const cn = classNames.bind(styles);

type FollowListType = {
  followListProps: ModalPropsType & {
    title: string;
    isFollow: boolean;
  };
};

/**
 * @param {Object} followListProps - 컴포넌트에 전달되는 props
 * @param {string} title - 모달 제목
 * @param {React.Dispatch<React.SetStateAction<boolean>>} handleClick - X 아이콘 클릭시 모달을 닫아주기 위한 setState 함수
 * @param {FollowType[]} followData - 팔로워 또는 팔로잉 데이터 / followData->이porp에 팔로잉또는 팔로워 데이터 넣어서 사용
 * @param {boolean} modalOpen - 모달 on/off 여부 변수
 * @param {boolean} isFollow - 팔로우 버튼이 필요한지 여부/ true: 팔로우 버튼 , false: 삭제 버튼
 * @returns {JSX.Element} 팔로워 또는 팔로잉 리스트 JSX
 */

export default function FollowList({ followListProps }: FollowListType) {
  const { title, toggleModal, isFollow, modalVisible } = followListProps;

  const router = useRouter();
  // const memberId = router.query.memberId;

  const memberId = 3;

  const { data: followingData = [] } = useQuery({
    queryKey: ['following', memberId],
    queryFn: () => getFollowingData(memberId),
  });

  console.log(followingData);

  // const { data: followerData = [] } = useQuery({
  //   queryKey: ['follower', memberId],
  //   queryFn: () => getFollowerData(memberId),
  // });

  // console.log(followerData);

  return (
    <Modal
      title={title}
      toggleModal={toggleModal}
      modalVisible={modalVisible}
      cssModalSize={cn('follow-container')}
      cssComponentDisplay={cn('follow-wrapper')}
    >
      <div>
        {followingData.map((follow:FollowData) => (
          <Follow
            key={follow.followingInfo.memberId}
            isFollow={isFollow}
            {...follow?.followingInfo}
          />
        ))}
      </div>
    </Modal>
  );
}
