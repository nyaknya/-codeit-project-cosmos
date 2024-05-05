import fetchData from '@/api/fetchData';
import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import { BackIcon, WarnIcon } from '@/components/Common/IconCollection';
import Toast from '@/components/Common/Toast';
import PostEditor from '@/components/Post/PostEditor';
import { PostRequestType } from '@/components/Post/types';
import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './PostWritePage.module.scss';

const cn = classNames.bind(styles);

export default function PostWritePage() {
  const router = useRouter();
  const [data, setData] = useState<PostRequestType>({
    title: '',
    category: '',
    content: '',
    hashTags: [],
  });
  const [isToastVisible, setIsToastVisible] = useState(false);

  const { postId } = router.query;

  const { mutate } = useMutation({
    mutationFn: () =>
      fetchData({
        param: `/post/create`,
        method: 'post',
        requestData: data,
      }),
    onSuccess: (response) => router.push(`/post/${response.postId}`),
  });

  const mergeState = (nextState: Partial<PostRequestType>) => {
    setData((prev) => ({ ...prev, ...nextState }));
  };

  const handleSubmitPostData = () => {
    if (!data.title && !data.content) {
      setIsToastVisible(true);
      console.log(data);
      return;
    }
    mutate();
  };

  useEffect(() => {
    setTimeout(() => {
      if (isToastVisible) setIsToastVisible(false);
    }, 5000);
  });

  return (
    <div className={cn('wrapper')}>
      <BackIcon
        width="18"
        height="18"
        onClick={() => router.back()}
        className={cn('back')}
      />
      <h2 className={cn('title')}>{postId ? '포스트 수정' : '포스트 작성'}</h2>
      <PostEditor
        postId={postId as string}
        postData={data}
        mergeState={mergeState}
      />
      <div className={cn('button-container')}>
        <DefaultButton
          buttonType="button"
          onClick={() => handleSubmitPostData()}
          size="large"
          color="purple"
        >
          등록하기
        </DefaultButton>
      </div>
      <Toast
        text="내용을 입력해주세요"
        icon={WarnIcon}
        isVisible={isToastVisible}
      />
    </div>
  );
}
