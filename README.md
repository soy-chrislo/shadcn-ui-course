# Shadcn/UI Course

![image-1](https://imgur.com/QCl0GcZ.png)

## Combobox Case 1

The following problem presents a case where two comboboxes have a dependency relationship (one-to-many and many-to-one). The goal of the exercise is to enhance the user experience by providing more options for the user to choose from.

## Example

The case involves a form for creating a property, where it is necessary to specify its district and neighborhood. A district is understood as a set of neighborhoods, where each neighborhood belongs to a single district.

## Goal

The goal is for the interface to behave in the following ways during interaction:

1. If the user selects a district, e.g., District A, the neighborhood combobox will only provide options for neighborhoods that belong to District A.
2. If the user selects a neighborhood before selecting a district, the district should be automatically selected, as the district can be directly inferred from the recently selected neighborhood.

![image-2](https://imgur.com/TfSzzif.png)