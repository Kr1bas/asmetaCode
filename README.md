# [W.I.P.]AsmetaCode
Repository for the Visual Studio Code Asmeta extension asmetaVSCE.

## Installation
As the extension is still a work in progress it is not yet published on the Visual Code Extension Marketplace.

You can either download the pre build package `asmetavsce-<major>.<minor>.<patch>.vsix`, or clone the repository and package it yourself.
To import the extension once downloaded or built go to: Extensions > Install from VSIX.
<img src="./Installation.png">

At this point in time you need to provide jars of the compiled asmeta modules yourself. Move the necessary jars file into the same directory and declare an environment variable ASMETA_HOME which points to that dorectory.

## Current implemented features
- Simulator run
- Syntax highlighter
- Parser run
- Model Checker run

## Known problems (non exaustive)
- File paths must NOT contain spaces

## Contact Information
<li> email: mirco.picca@studenti.unimi.it

## Disclaimer
I do not own the rights to Asmeta or any of it's components.

## Notes
Please note that this is just a sideproject. As such, it is not regularly updated or worked on.
Every contribute is well appreciated.
