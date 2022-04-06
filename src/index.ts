import 'reflect-metadata';
import { useContainer as rcUseContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { Application } from './app';

rcUseContainer(Container);
const app = Container.get(Application);
app.start();
