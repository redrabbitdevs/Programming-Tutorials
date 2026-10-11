for text in ["12", "twelve"]:
    print("Trying", repr(text))
    try:
        number = int(text)
    except ValueError:
        print("  except: not a number")
    else:
        print("  else: got", number)
    finally:
        print("  finally: finished with", repr(text))
