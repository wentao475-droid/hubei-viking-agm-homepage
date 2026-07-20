# Website Acquisition Measurement

The website uses the sample and specification match as the primary conversion. Quotation remains a later commercial step.

## UTM link format

Use a different URL for each outbound channel:

```text
https://www.vikingagm.com/request-agm-separator-sample/?utm_source=linkedin&utm_medium=outbound&utm_campaign=ups-buyers
https://www.vikingagm.com/request-agm-separator-sample/?utm_source=email&utm_medium=outbound&utm_campaign=energy-storage-buyers
https://www.vikingagm.com/request-agm-separator-sample/?utm_source=b2b-directory&utm_medium=listing&utm_campaign=agm-separator
```

Recommended values:

| Field | Use |
|---|---|
| `utm_source` | Platform or list source |
| `utm_medium` | `outbound`, `listing`, `organic`, `referral` |
| `utm_campaign` | Target segment or campaign name |
| `utm_content` | Message, profile or placement variant |
| `utm_term` | Optional application or keyword |

Do not change naming halfway through a campaign.

## Weekly metrics

Track only:

1. valid inquiries;
2. sample requests;
3. source channel;
4. first response time;
5. leads reaching `quoted`.

Use the admin CSV export for the weekly review. Do not judge a channel before the UTM and lead-stage data are complete.

## Lead handling

Suggested stage meaning:

| Stage | Definition |
|---|---|
| `new` | Not reviewed |
| `contacted` | First response sent or contact attempted |
| `qualified` | Application and buyer need are credible |
| `sample` | Sample or specification evaluation is active |
| `quoted` | Commercial quotation sent |
| `won` | Order or confirmed commercial outcome |
| `lost` | Not progressing |

Record the next follow-up date and a short note whenever a lead moves stage.
