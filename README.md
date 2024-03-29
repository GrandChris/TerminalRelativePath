# Just let me click this freaking paths
Enables you to click relative paths, starting at the './build' directory, inside the integrated terminal.

[https://github.com/GrandChris/TerminalRelativePath](https://github.com/GrandChris/TerminalRelativePath)
## Background
When you use CMake and Ninja with GCC you get relative paths starting at the './build' directory. You can specify the path for the Problem Matcher of your VSCode task, but this does not influence the behavior of the integrated terminal.   
An option would be to use absolute paths, but there is no option for it, weather in CMake, nor in Ninja nor in GCC. Besides using absolute paths with Ninja breaks custom CMake header dependencies (2020-11-15) (for example a generated header file is dependent on a .json file).   
To be able to still click the relative paths in the integrated terminal, this extension is born.

## Demo
![Demo](https://raw.githubusercontent.com/GrandChris/TerminalRelativePath/main/media/ucppcoro-1605453080747.gif)

## Obsoletion
This extension became obsolete with https://gitlab.kitware.com/cmake/cmake/-/merge_requests/6148. The new recommended way to fix this issue is to update to CMake > 3.21.0.
