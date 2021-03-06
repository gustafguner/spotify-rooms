import * as React from 'react';

interface MountProps {
  event: () => void;
}

const Mount: React.FC<MountProps> = ({ event }) => {
  React.useEffect(() => {
    event();
  }, []);

  return null;
};

interface UpdateProps {
  event: () => void;
  watch?: any[];
}

const Update: React.FC<UpdateProps> = ({ event, watch }) => {
  if (watch !== null) {
    React.useEffect(() => {
      event();
    }, watch);
  } else {
    React.useEffect(() => {
      event();
    });
  }

  return null;
};

interface UnmountProps {
  event: () => void;
}

const Unmount: React.FC<UnmountProps> = ({ event }) => {
  React.useEffect(() => {
    return () => {
      event();
    };
  }, []);

  return null;
};

export { Mount, Update, Unmount };
