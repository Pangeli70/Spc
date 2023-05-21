# Apg-Uts Help

Ver. 0.9.7 - 2023/05/13
<br>

### Import the library in ```deps.ts``` of your project 


Using:
```Typescript
export * as Uts from "https://raw.githubusercontent.com/Pangeli70/apg-uts/master/mod.ts";
```

Import in your file using:
```Typescript
import { Uts, ... } from "[...PATH...]/deps.ts";
```

<br><br>
## Services

Hold some global data for the application. They are a sort of singletons or static classes.

### ApgUtsBaseService

An abstact class to use as a base for other services.
Holds the CLASS_NAME of the service extrapolated from the file name using the import.meta.url value.

### ApgUtsSpecService

An abstract class that can be used for creating specs.

<br><br>
## Classes

### ApgUtsDateTimeStamp

Custom Apg date stamp creates a string representations of date-times meant to 
be used as an immutable identifier.

### ApgUtsMeasureUnitValue

Numeric value with its measure unit pre arranged for future conversions

### ApgUtsMetaUrl

Utility to extract source file name from transpiler using import.meta.url


<br><br>
## Statics
Collections of static methods grouped by context to be easily accessible 
using class name as a name space

### ApgUtsEnum

Collection of static methods to get info from and do checks on enumerations

### ApgUtsFs

Collection of static methods for File system management. Not very useful on Deploy indeed

### ApgUtsIs

Collection of static methods to check types and if some conditions are met

### ApgUtsJsonFile

Collection of static methods for safer json file manipulation

### ApgUtsMap

Collection of static methods to convert Record<> objects in maps and vice versa

### ApgUtsMath

Collection of static methods to expand Math utility functions

### ApgUtsObj

Collection of static methods to copy and freeze objects

### ApgUtsStr

Collection of static methods to expand string utility functions.


<br><br>
## Data

Small extendable databases to hold and share common informations. Could be arrays 
or records

### ApgUtsMeasureUnits

Record of standard measure units definitions


<br><br>
## Enums

Hard coded collections and lists of identificatos

### eApgUtsLogMode

List of modes for the type of logging for ApgUtsSpecService console messages

### eApgUtsMagnitude

LIst of magnitudes used as coefficents to convert values to and from different measure units

### eApgUtsMeasureUnitsIds

List of predefined measure units identificators

### eApgUtsMeasureUnitsTypes

List of types of measure units: primary, derived etc.

### eApgUtsSpecClause

List of clauses for ApgUtsSpecService events

### eApgUtsSpecRun

List of commands to run or skip a test spec


<br><br>
## Interfaces

### IApgUtsDevlogTodo

Development Log Todo item: groups activities with a milestone title

### IApgUtsHyperlink

Data structure to hold fields for menus and lists of links

### IApgUtsMeasureUnit

Measure unit data structure prearranged for future conversions

### IApgUtsSpecEvent

Data structure to store event data for the ApgUtsSpecService


<br><br>
## Services

### ApgUtsBaseService

Basic Apg Service that owns a class name from source file name through import.meta.url

### ApgUtsSpecService

Abstract service with testing capabilities


<br><br>
## Types

### TApgUtsInteger

Type to check if we are dealing with an integer number
