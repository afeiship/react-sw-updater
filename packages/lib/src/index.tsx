import React from 'react';
import SwRuntime from '@jswork/sw-runtime';

export type UpdateEventOptions = {
  hasUpdate: boolean;
  execute: (isConfirmed: boolean) => void;
  ok: () => void;
  cancel: () => void;
  update: () => Promise<void>;
};

export type ReactSwUpdaterProps = {
  disabled?: boolean;
  interval?: number;
  mute?: boolean;
  onChange?: (event: UpdateEventOptions) => void;
  swRuntimeOptions?: any;
};

export default class ReactSwUpdater extends React.Component<ReactSwUpdaterProps> {
  static defaultProps = {
    disabled: false,
    interval: 5 * 1000,
    mute: false,
  };

  state = {
    needRefresh: false,
  };

  private swInstance: any;

  componentDidMount() {
    const { disabled, interval, mute, swRuntimeOptions } = this.props;
    this.swInstance = SwRuntime.install({
      swDest: '/sw.js',
      autoUpdate: true,
      disabled,
      autoUpdateInterval: interval,
      onAutoUpdate: function() {
        if (mute) return;
        console.log('SW Event: onAutoUpdate');
      },
      onUpdateReady: () => {
        this.setNeedRefresh(true);
      },
      ...swRuntimeOptions,
    });
  }

  updateServiceWorker = () => {
    this.swInstance.applyUpdate().then(() => {
      this.setNeedRefresh(false);
      setTimeout(() => window.location.reload(), 100);
    });
  };

  setNeedRefresh = (needRefresh: boolean) => {
    const { onChange } = this.props;
    const ok = this.updateServiceWorker;
    const cancel = () => this.setNeedRefresh(false);
    this.setState({ needRefresh });
    if (needRefresh) {
      onChange?.({
        hasUpdate: needRefresh,
        execute: (confirmed) => (confirmed ? ok() : cancel()),
        ok,
        cancel,
        update: () => this.swInstance.applyUpdate(),
      });
    }
  };

  render() {
    return null;
  }
}
