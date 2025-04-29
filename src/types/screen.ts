export type ScreenType = 'weather' | 'placeholder';

export interface Screen {
  type: ScreenType;
  component: React.ComponentType<any>;
}
