export class File {
  name: string;
  size: number;
  isDirectory: boolean;

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
    this.isDirectory = false;
  }
}

export class Directory {
  children?: FileSystemChild[];
  isDirectory: boolean;
  path: string;
  parentDirectory?: Directory;
  _sizeCache: number | null;

  constructor({
    path,
    parentDirectory,
    children = [],
  }: {
    path: string;
    parentDirectory?: Directory;
    children?: FileSystemChild[];
  }) {
    this.path = path;
    this.children = children;
    this.parentDirectory = parentDirectory;
    this.isDirectory = true;
  }

  insert(child: FileSystemChild) {
    if (child.isDirectory) {
      child = child as Directory;
      child.parentDirectory = this;
    }

    this.children.push(child);
    this._invalidateSizeCache();
  }

  _invalidateSizeCache() {
    this._sizeCache = null;
  }

  get size() {
    if (!this._sizeCache) {
      this._sizeCache = this.children.reduce((accumulator, currentValue) => {
        if (currentValue.isDirectory) {
          return (accumulator += currentValue.size);
        }
        return (accumulator += currentValue.size);
      }, 0);
    }

    return this._sizeCache;
  }
}

export type FileSystemChild = File | Directory;

export default class FileSystem {
  root: Directory;
  currentDirectory: Directory;
  totalDiskSpace: number;

  constructor(startingPath = '/') {
    this.root = new Directory({path: startingPath});
    this.currentDirectory = this.root;
    this.totalDiskSpace = 70000000;
  }

  cd(path: string) {
    if (path === '/') {
      this.currentDirectory = this.root;
    } else if (path === '..') {
      if (this.currentDirectory.path === '/') {
        console.error('cant cd out from root directory');
      } else {
        this.currentDirectory = this.currentDirectory.parentDirectory;
      }
    } else {
      this.currentDirectory = this.currentDirectory.children.find((child) => {
        if (child.isDirectory) {
          child = child as Directory;
          return child.path === path;
        }

        return false;
      }) as Directory;
    }
    return this.currentDirectory;
  }

  remainingDiskSpace() {
    return this.totalDiskSpace - this.root.size;
  }
}

export function buildFileSystemFromInput(lines: string[]) {
  const fileSystem = new FileSystem('/');
  let currentCommand = null;

  lines.forEach((line: string) => {
    const commands = line.split(' ');
    const currentDirectory = fileSystem.currentDirectory;

    if (commands[0] === '$') {
      currentCommand = null;
      const command = commands[1];
      const commandInput = commands[2];

      if (command === 'cd') {
        fileSystem.cd(commandInput);
      }

      if (command === 'ls') {
        currentCommand = 'ls';
      }
    } else if (currentCommand === 'ls') {
      if (commands[0] === 'dir') {
        currentDirectory.insert(new Directory({path: commands[1]}));
      } else {
        const [size, name] = commands;
        currentDirectory.insert(new File(name, Number(size)));
      }
    }
  });

  return fileSystem;
}
