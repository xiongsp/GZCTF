import type { NextPage } from 'next';
import Link from 'next/link';
import { TextInput, Button, Anchor } from '@mantine/core';
import { useInputState, useWindowEvent } from '@mantine/hooks';
import AccountView from '../../components/AccountView';
import { showNotification } from '@mantine/notifications';
import Icon from '@mdi/react';
import { mdiCheck, mdiClose } from '@mdi/js';
import api from '../../Api';

const Recovery: NextPage = () => {
  const [email, setEmail] = useInputState('');

  const onRecovery = () => {
    api.account
      .accountRecovery({
        email,
      })
      .then(() => {
        showNotification({
          color: 'teal',
          title: '一封恢复邮件已发送',
          message: '请检查你的邮箱及垃圾邮件~',
          icon: <Icon path={mdiCheck} size={1} />,
          disallowClose: true,
        });
      })
      .catch((err) => {
        showNotification({
          color: 'red',
          title: '遇到了问题',
          message: `${err}`,
          icon: <Icon path={mdiClose} size={1} />,
        });
      });
  };

  useWindowEvent('keydown', (e) => {
    console.log(e.code);
    if (e.code == 'Enter' || e.code == 'NumpadEnter') {
      onRecovery();
    }
  });

  return (
    <AccountView>
      <TextInput
        required
        label="邮箱"
        placeholder="ctf@example.com"
        type="email"
        style={{ width: '100%' }}
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
      />
      <Link href="/account/login" passHref={true}>
        <Anchor<'a'>
          sx={(theme) => ({
            color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
            fontWeight: 500,
            fontSize: theme.fontSizes.xs,
            alignSelf: 'end',
          })}
        >
          准备好登录？
        </Anchor>
      </Link>
      <Button fullWidth onClick={onRecovery}>
        发送重置邮件
      </Button>
    </AccountView>
  );
};

export default Recovery;