import { Theme } from '@mui/material/styles';

import Button from './Button';
import Card from './Card';
import Link from './Link';
import Switch from './Switch';
import Table from './Table';
import Tabs from './Tabs';

export function componentsOverrides(theme: Theme) {
  return Object.assign(
    Table(theme),
    Card(theme),
    Button(theme),
    Link(),
    Tabs(theme),
    Switch(theme),
  );
}
