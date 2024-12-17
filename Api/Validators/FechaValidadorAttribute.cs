using System;
using System.ComponentModel.DataAnnotations;

public class FechaValidadorAttribute : ValidationAttribute
{
    public override bool IsValid(object value)
    {
        if (value is DateTime fecha)
        {
            DateTime hoy = DateTime.Today;
            DateTime hace100Anios = hoy.AddYears(-100);

            return fecha >= hace100Anios && fecha <= hoy; 
        }

        return false; 
    }

    public override string FormatErrorMessage(string name)
    {
        return $"La fecha debe estar entre hoy y hace 100 años.";
    }
}