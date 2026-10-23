import { Order } from '../types';

/**
 * Creates a Google Doc file containing a fully formatted, premium order receipt
 * and saves it into the user's Google Drive.
 * 
 * @param order Completed order details
 * @param accessToken User's Google OAuth Access Token
 * @returns Clickable Google Doc URL
 */
export async function exportReceiptToGoogleDoc(order: Order, accessToken: string): Promise<string> {
  try {
    // 1. Create a new empty Google Doc
    const createResponse = await fetch('https://docs.googleapis.com/v1/documents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: `BiteCraft Receipt ${order.id}`
      })
    });

    if (!createResponse.ok) {
      const errorData = await createResponse.json();
      throw new Error(`Google Docs creation failed: ${errorData?.error?.message || createResponse.statusText}`);
    }

    const docMetadata = await createResponse.json();
    const documentId = docMetadata.documentId;

    if (!documentId) {
      throw new Error('Failed to retrieve Document ID from created file');
    }

    // 2. Format the receipt text
    const dateFormatted = new Date(order.timestamp).toLocaleString();
    
    let itemsText = '';
    order.items.forEach(item => {
      const itemName = item.menuItem.name;
      const q = item.quantity;
      const basePrice = item.menuItem.price;
      const totalItemPrice = (basePrice * q).toFixed(2);
      itemsText += `  ${q}x ${itemName} (${item.menuItem.calories} Cal)\n`;
      itemsText += `     @ $${basePrice.toFixed(2)} each .............. $${totalItemPrice}\n`;
      if (item.customization) {
        itemsText += `     👉 Special Prep: "${item.customization}"\n`;
      }
      itemsText += `\n`;
    });

    const receiptContent = `========================================================================
                      B I T E C R A F T   P R E M I U M
                              FAST FOOD RESTAURANT
                           "Fresh. Fast. Delicious."
========================================================================

ORDER DATE: ${dateFormatted}
ORDER ID:   ${order.id}
STATUS:     ${order.status.toUpperCase()}

------------------------------------------------------------------------
CUSTOMER DETAILS:
------------------------------------------------------------------------
Name:    ${order.customerDetails.name}
Phone:   ${order.customerDetails.phone}
Email:   ${order.customerDetails.email}
Address: ${order.customerDetails.address}
${order.customerDetails.notes ? `Notes:   "${order.customerDetails.notes}"\n` : ''}
------------------------------------------------------------------------
YOUR DELICIOUS BASKET:
------------------------------------------------------------------------
${itemsText}------------------------------------------------------------------------
FINANCIAL SUMMARY:
------------------------------------------------------------------------
Subtotal:                                                   $${order.subtotal.toFixed(2)}
Delivery Surcharge:                                         $${order.deliveryFee.toFixed(2)}
Estimated Taxes (8%):                                       $${order.tax.toFixed(2)}
Discounts Applied:                                         -$${order.discount.toFixed(2)}
------------------------------------------------------------------------
GRAND TOTAL PAID:                                           $${order.total.toFixed(2)}
------------------------------------------------------------------------

Payment Mode:           ${order.paymentMethod.toUpperCase()} (Authorized Secured Checkout)
Estimated Arrival:      Within ${order.estimatedDeliveryTime}

========================================================================
THANK YOU FOR DINING WITH BITE_CRAFT PREMIUM!
========================================================================
We hope your meal exceeds expectations. We partner daily with organic farms 
to bring you premium 100% Angus cuts, fresh greens, and artisan recipes.

• Reach Us:      +1 (800) 555-BITE (2483)
• Location:      742 Gourmet Plaza, Sector 4, Silicon Valley
• Online Hub:    support@bitecraftfastfood.com

========================================================================
Generated via BiteCraft Workspace Integration, saved to Google Docs.
========================================================================`;

    // 3. Update the Doc with the receipt content and some premium formatting
    const updateResponse = await fetch(`https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requests: [
          // Insert the main plain text
          {
            insertText: {
              location: {
                index: 1
              },
              text: receiptContent
            }
          },
          // Style all text with clean JetBrains Mono / Monospaced styling for exact column alignments
          {
            updateTextStyle: {
              textStyle: {
                weightedFontFamily: {
                  fontFamily: 'Courier New'
                },
                fontSize: {
                  size: {
                    magnitude: 10,
                    unit: 'PT'
                  }
                },
                foregroundColor: {
                  color: {
                    rgbColor: {
                      red: 0.1,
                      green: 0.13,
                      blue: 0.2
                    }
                  }
                }
              },
              fields: 'weightedFontFamily,fontSize,foregroundColor',
              range: {
                startIndex: 1,
                endIndex: receiptContent.length + 1
              }
            }
          }
        ]
      })
    });

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      console.warn('Batch update styling failed, but document was created:', errorData);
    }

    // Return the editable Google Doc link
    return `https://docs.google.com/document/d/${documentId}/edit`;
  } catch (error) {
    console.error('Error generating Google Doc Receipt:', error);
    throw error;
  }
}
