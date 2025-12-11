# Task 2 and 3: Hiring equipment and Earnings report
# Student number: 24120579

# Dictionary containing available equipment and their prices.
equipment_inventory = {
    "Day chairs": {"price": 15.00},
    "Bed chairs": {"price": 25.00},
    "Bite Alarm (set of 3)": {"price": 20.00},
    "Bite Alarm (single)": {"price": 5.00},
    "Bait Boat": {"price": 60.00},
    "Camping tent": {"price": 20.00},
    "Sleeping bag": {"price": 20.00},
    "Rods (3lb)": {"price": 10.00},
    "Rods (Bait runners)": {"price": 5.00},
    "Reels (Bait runners)": {"price": 10.00},
    "Camping Gas stove (Double burner)": {"price": 10.00},
}

# List to store all hire records.
hires = []

# Subroutine to add a new hire record
def add_hire_record():
    print("\nAdd Hire Record")

    # Collects customer details.
    customer_id = input("Enter Customer ID: ")
    customer_name = input("Enter Customer Name: ")
    phone_number = input("Enter Phone Number: ")
    house_number = input("Enter House Number: ")
    postcode = input("Enter Postcode: ")
    credit_or_debit_card = input("Enter Credit/Debit Card Number: ")

    # Displays available equipment and price.
    print("\nEquipment available for hire")
    # Creates table structure
    print("="*62)
    print(f"| {'Equipment':<40} | {'Price per night':<12} |")
    print("="*62)

    for equipment, details in equipment_inventory.items():
        print(f"| {equipment:<40} | £ {details['price']:<13.2f} |")

    print("="*62)
   
    # Collects and validates the number of items to hire.
    while True:
        try:
            items_for_hire = int(input("\nEnter number of different items to hire: "))
            if items_for_hire > 0:
                break
            else:
                print("Enter a positive number.\n")
        except ValueError:
            print("Not a valid input. Please enter a number.\n")

    # Collects hire item details.    
    hired_items = []

    for item_number in range(1, items_for_hire + 1):
        print(f"\nItem {item_number}: ")

        # Collects and validates equipment type.
        while True:
            equipment_type = input("Enter equipment type: ")
            if equipment_type in equipment_inventory:
                break
            else:
                print("Item is not in equipment list. Please choose from the list provided.\n")

        # Collects and validates quantity.
        while True:
            try:
                quantity = int(input("Enter quantity: "))
                if quantity > 0:
                    break
                else:
                    print("Invalid input. Please enter a positive number.\n")
            except ValueError:
                print("Invalid input. Please enter a number.\n")

        # Collects and validates number of nights.
        while True:
            try:
                number_of_nights = int(input("Enter number of nights: "))
                if number_of_nights > 0:
                    break
                else:
                    print("Invalid input. Please enter a positive number of nights.\n")
            except ValueError:
                print("Invalid input. Please enter a number.\n")    

        # Collects and validates return status.  
        while True:
            returned_on_time = input("Returned on time? (y/n): ").lower()
            if returned_on_time not in ["y", "n"]:
                print("Invalid choice. Please choose either 'y' or 'n'\n")
            else:
                break

        # Add item details to list.
        hired_items.append({
            "equipment_type": equipment_type,
            "quantity": quantity,
            "number_of_nights": number_of_nights,
            "returned_on_time": returned_on_time,
        })

    # Create hire record from user entered details.
    hire_record = {
        "customer_id": customer_id,
        "customer_name": customer_name,
        "phone_number": phone_number,
        "house_number": house_number,
        "postcode": postcode,
        "credit_or_debit_card": credit_or_debit_card,
        "hired_items": hired_items,
    }

    # Store hire record in hires list.
    hires.append(hire_record)
    print("\nHire record added successfully")

# Subroutine to generate the earnings report.
def earnings_report():
    # Checks if hire list is empty.
    if not hires:
        print("\nNo records found.")
        return
    
    total_earnings = 0
    
    # Creates earning report structure.
    print("\nEarnings Report")
    print("="*152)
    print(f"| {'Customer ID':<12} | {'Equipment':<35} | {'Number of nights':<18} | {'Total cost':<12} | {'Returned on time (y/n)':<25} | {'Extra charge for delayed return':<32} |")
    print("="*152)

    # Loops through every hire record.
    for record in hires:

        # Loops through every hired item in this record.
        for item in record["hired_items"]:
            equipment_type = item["equipment_type"]
            quantity = item["quantity"]
            number_of_nights = item["number_of_nights"]
            returned_on_time = item["returned_on_time"]

            # Calculates initial cost.
            price_per_night = equipment_inventory.get(equipment_type, {}).get("price", 0)
            cost = price_per_night * quantity * number_of_nights
            late_fee = 0

            # Calculate and apply late fee if items were returned late.
            if returned_on_time.lower() == "n":
                late_fee = cost*0.5
                cost += late_fee

            print(f"| {record['customer_id']:<12} | {equipment_type:<35} | {number_of_nights:<18} | £{cost:< 11.2f} | {returned_on_time:<25} | £{late_fee:< 31.2f} |")

            # Add item cost to total earnings.
            total_earnings += cost
   
    print("=" * 152)
    # Displays final totals.
    print(f"{'Total earnings':<12} {'':<60} £{total_earnings: .2f}")

# Program displays a menu and processes user's input.
# Loops until option 3 (Exit) is selected.
while True:
    # Displays main menu.
    print("================================")
    print("|         Main menu            |")
    print("================================")
    print("| 1. Customer and hire details |")
    print("| 2. Earnings report           |")
    print("| 3. Exit                      |")
    print("================================")

    # Get user input.
    choice = input("\nEnter your choice (1-3): ")

    # Validates user input.
    if choice not in ["1", "2", "3"]:
        print("\nInvalid choice. Please enter 1, 2 or 3")
        continue

    # Process valid input.
    if choice == "1":
        add_hire_record()
    elif choice == "2":
        earnings_report()
    elif choice == "3":
        print("\nExiting program")
        break # Exits loop and ends the program.